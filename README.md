# lambdas3

*Experimental and incomplete*

This was to see if lambda could be used to clone and move a repo to s3 from codecommit.  This turned out to be flawed
because of [this issued](https://github.com/libgit2/libgit2/issues/3058).  As a repo grows, the number of
git objects grows and will take too much time to work within lambda's constraints.  If however shallow cloning
is allowed or codecommit allows a zip export this might be revisted.
