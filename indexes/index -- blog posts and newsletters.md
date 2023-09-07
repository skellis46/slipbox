# index -- blog posts and newsletters

[[indexes]]
#index 

```dataview
table file.mtime as "Modified"
from #blog-post OR #newsletter 
sort file.ctime desc
``` 