# index -- blog posts

[[indexes]]
#index 

```dataview
table file.mtime as "Modified"
from #blog-post 
sort file.ctime desc
``` 