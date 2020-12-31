#!/usr/bin/env bash
# ^^ need to use env to get the brew-installed bash 4.x in /usr/local/bin on mac

# 6RS: to run this script on a Mac, you need to:
# brew install bash md5sha1sum
# The version of bash provided by macOS doesn't support associative arrays
# macOS has only md5, not md5sum, not trying to code the script for both

# This script expects to be run from the root of the project, NOT from the
# directory in which it lives.

# strict mode
set -euo pipefail

bootstrapfile=./test/scoring/bootstrap.xml
resultfile=./test/scoring/results.xml

# array first to get output ordered
declare -a stepnames=(
	npminstall
	npmlint
	npmresults
	npmtestsok
)
declare -A steps
for k in "${stepnames[@]}" ; do
	steps[$k]=0
done

# when HackerRank runs the scoring, they don't run npm install or anything else
# automatically
if [[ "$*" == *--quick* ]] && [ -d node_modules ] ; then
	steps[npminstall]=skipped
elif npm install ; then
	steps[npminstall]=1
fi
if npm run lint ; then
	steps[npmlint]=1
fi
export MOCHA_OPTS="--reporter xunit --reporter-options output=${resultfile}"
rm -f "$resultfile"
if npm run test:real ; then
	steps[npmtestsok]=1
fi
if [ -s "$resultfile" ]; then
	steps[npmresults]=1
fi

failures=0
skipped=0
for v in "${steps[@]}" ; do
	if [ "$v" = "skipped" ]; then
		skipped=$((skipped + 1))
	elif [ "$v" != "1" ]; then
		failures=$((failures + 1))
	fi
done
rm -f "$bootstrapfile"
{
	echo "<testsuite name=\"Bootstrap\" tests=\"${#steps[@]}\" failures=\"${failures}\" errors=\"0\" skipped=\"${skipped}\">"
	for k in "${stepnames[@]}" ; do
		echo "<testcase classname=\"scoring.sh\" name=\"$k\">"
		if [ "${steps[$k]}" = "skipped" ]; then
			echo "<skipped/>"
		elif [ "${steps[$k]}" != "1" ]; then
			echo "<failure>TEST FAILED</failure>"
		fi
		echo "</testcase>"
	done
	echo "</testsuite>"
} > "$bootstrapfile"
