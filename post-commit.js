var fs = require('fs');

//This is called when the post-commit hook is called
var replacer 		= '###changelog-prepend###';
var changelogPath	= 'dev/changelog.txt'; //always relative to /.git/../

var args = process.argv.slice(2); 
var message_arg 		= '';
var commit_title_arg 	= '';
var commit_hash_arg 	= '';

var bNextIsMessage = false;
var bNextIsCommitHash = false;
var bNextIsCommitTitle = false;

args.forEach(function(v,k){
	if (bNextIsMessage){
		message_arg = v;
	}
	
	if (bNextIsCommitHash){
		commit_hash_arg = v;
	}
	
	if (bNextIsCommitTitle){
		commit_title_arg = v;
	}
	
	bNextIsMessage 		= v=='--m';
	bNextIsCommitHash	= v=='--c';
	bNextIsCommitTitle	= v=='--ct';
});


if (!message_arg || !commit_hash_arg || !commit_title_arg) {
	message_arg = ' ---- ERROR: PLEASE CHECK YOUR CODE. NO MESSAGE WAS GIVEN. -----';
}

commit_title_arg = commit_title_arg.trim().substr(-1);
if (commit_title_arg!='$') {
	//we dont want to add to the changelog when there is no trailing $ in the title
	return false ;
}


fs.readFile(changelogPath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  
  var strToAdd = '- '+commit_hash_arg+"\n"+message_arg;
  var result = data.replace(replacer, replacer+"\n"+strToAdd);

  fs.writeFile(changelogPath, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
