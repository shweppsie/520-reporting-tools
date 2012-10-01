#!/bin/bash

students=(
	"Name:/path/to/wordcountfile.wc"
)

teabreakfile="http://someurl/"

# subtrack the contents from the points
# best attempt to fix the values produced by the makefile :(
#count=`cat build/thesis.pdf.txt | sed -e '/Chapter 1/q' | wc -w`

# bump the maxtime on the x axis an hour ahead of now
date="`echo "
from datetime import datetime, timedelta
d=datetime.today()+timedelta(hours=1)
print d.strftime('%d/%m/%y|%H:%M:%S')
" | /usr/bin/python`"

echo 'set terminal png nocrop size 1920,1080 font "/home/no15/Helvetica.ttf" 20 linewidth 2
set output "/home/no15/public_html/progress.png"
set key left top
set xdata time
set xtics format "%b %d"
set timefmt "%d/%m/%y|%H:%M:%S"
set xrange ["22/09/12|00:00:00":"'${date}'"]
set xlabel "Date" offset 0,-1
set ylabel "Word count"
set label "Teabreaks: "  at graph  0.125, graph 0.95
set arrow from graph(0,0.205),graph(0,0.93) to graph(0,0.205),graph(0,0.97) linecolor rgb "#708090" nohead
'`
curl -s -L "${teabreakfile}" | while read line
do
	start=${line:0:17}
	end=${line:18:17}
	echo 'set arrow from "'${start}'",graph(0,0) to "'${start}'",graph(1,1) linecolor rgb "#708090" nohead;'
done
`'
plot '`
i=0
for student in ${students[@]}
do
	path=${student#*:}
	name=${student%%:*}
	echo '"'${path}'" using 1:($3 - 0) with steps \
	title "'${name}'"'
	i=$(($i+1))
	if [ $i -ne ${#students[@]} ]; then
		echo ","
	fi
done` | gnuplot -persist

