var mongoose = require('mongoose');
var GitHub = require('github-api');


var userSchema = mongoose.Schema({
    githubUsername : {type: String, required: true},
    githubEmail    : {type: String, required: true},
    githubToken    : {type: String, required: true},
    // achievements   : []
    //TODO Add more stuff
});

userSchema.statics.findOrCreate = function(parameters, callback){
    mongoose.model('User').findOne({"githubUsername": parameters.githubUsername}, function(err, user){
        if (err) return callback(err);
        if(user) return callback(null, user);
        mongoose.model('User').create(parameters, callback);
    });
};

//Get all code in user's repo
userSchema.methods.getAllCode = function(cb) { //TODO change statics to methods
    console.log(this.githubToken);
    var gh = new GitHub({
        // token: this.githubToken
        token : "3daef80ab5c142d81b64b1f39a7e6ccd47f35fbc"
    });


    var user = gh.getUser(this.githubUsername);

    user.listRepos().then(function(repos){
        console.log("GOT REPOS")
        repos = repos.data;
        var promises = []
        for (i in repos){
            var repo = gh.getRepo(repos[i].owner.login, repos[i].name)

            var promise = getRepoFiles(repo)
            promises.push(promise);

            if (i >= 2) break; //TODO Remove (and hope this can handle it)
        };
        Promise.all(promises).then(function(results){
            console.log("DONE");
            cb(results)
        })
    }).catch(function(err){console.log(err)});

    function getRepoFiles(repo) {
        console.log("Getting all files in repo: " + repo.__fullname);

        return new Promise(
                function(resolve, reject) {
                    getRepoFilePaths(repo).then(function(files){
                        console.log("   Getting contents for all files....")
                        getFiles(repo, files).then(function(content){

                            var results = [];
                            for (i in content){
                                var file = content[i].data;

                                var code = {
                                    path    : file.path,
                                    url     : file.html_url,
                                    content : new Buffer(file.content, 'base64').toString("ascii")
                                }

                                results.push(code);
                            }
                            console.log("    Got contents for repo: " + repo.__fullname);
                            resolve(results);
                        });
                    })
                }

            )
    }

    function getRepoFilePaths(repo){
        return new Promise(
                function(resolve, reject) {
                    repo.getRef('').then(function(ref){
                        var treeSha = ref.data[0].object.sha;
                        repo.getTree(treeSha+"?recursive=1").then(function(tree){
                            tree = tree.data.tree;
                            var files = tree.filter(function(a){ return a.type === 'blob'}).map(function(a){ return a.path});
                            resolve(files);
                        });
                    });

                }
            );
    };

    function getFiles(repo, files){
        console.log("getfiles")
        var promises = [];
        for (i in files) {
            //Only get JS files for now
            var fileType = files[i].split('.').pop()
            if (fileType === 'js' || fileType === "java"){
                console.log(files[i])
                promises.push(repo.getContents('master', files[i], false));
            }
        }
        return Promise.all(promises);
    }

};

module.exports = mongoose.model('User', userSchema);
