# Hand Labeling Considered Harmful

![rw-book-cover](https://www.oreilly.com/radar/wp-content/uploads/sites/3/2019/06/14596619419_3bf6a20837_o_crop-e5e063b4fbef44f2953cd5f763c5c3f7-2.jpg)

## Metadata
- Author: [[Shayan Mohanty]]
- Full Title: Hand Labeling Considered Harmful
- Category: #articles
- Document Tags: [[harmful_content]] 
- URL: https://www.oreilly.com/radar/arguments-against-hand-labeling/

## Highlights

> There’s another critical issue, which is in some ways upstream to the challenges of bias and explainability: while we seem to be living in the future with the creation of machine learning and deep learning models, we are still living in the Dark Ages with respect to the curation and labeling of our training data: *the vast majority of labeling is still done by hand*. ([View Highlight](https://read.readwise.io/read/01h7fje54g1mygzhqq36q0jf84))


> This point is key: as humans, we possess all types of biases, some harmful, others not so. When we feed hand labeled data to a machine learning model, it will detect those patterns and replicate them at scale. This is why [David Donoho astutely observed](https://hdsr.mitpress.mit.edu/pub/rim3pvdw/release/6) that perhaps we should call ML models *recycled intelligence* rather than *artificial intelligence*. Of course, given the amount of bias in hand labeled data, it may be more apt to refer to it as *recycled stupidity* (hat tip to [*artificial stupidity*](https://en.wikipedia.org/wiki/Artificial_stupidity)). ([View Highlight](https://read.readwise.io/read/01h7fjj6vggkq2md6tkfy8xw2f))


> The only way to interrogate the reasons for underlying bias arising from hand labels is to ask the labelers themselves their rationales for the labels in question, which is impractical, if not impossible, in the majority of cases: there are rarely records of who did the labeling, it is often outsourced via at-scale global APIs, such as Amazon’s Mechanical Turk and, when labels are created in-house, previous labelers are often no longer part of the organization. ([View Highlight](https://read.readwise.io/read/01h7fjjkefn8rqax5qh74dxcm3))


> Money isn’t the only cost, and quite often, isn’t where the bottleneck or rate-limiting step occurs. Rather, it is the bandwidth and time of experts that is the scarcest resource. As a scarce resource, this is often expensive but, much of the time it isn’t even available (on top of this, the time it also takes to correct errors in labeling by data scientists is very expensive). Take financial services, for example, and the question of whether or not you should invest in a company based on information about the company scraped from various sources. In such a firm, there will only be a small handful of people who can make such a call, so labeling each data point would be incredibly expensive, and that’s if the SME even has the time. ([View Highlight](https://read.readwise.io/read/01h7fjsy5qh0v9sshy68xh1s23))


> The key question isn’t “should I hand label my training data or should I label it programmatically?” It should instead be “which parts of my data should I hand label and which parts should I label programmatically?” According to these papers, by introducing expensive hand labels sparingly into largely programmatically generated datasets, you can maximize the effort/model accuracy tradeoff on SOTA architectures that wouldn’t be possible if you had hand labeled alone. ([View Highlight](https://read.readwise.io/read/01h7fk0t28sk55jwwha5fms27n))


+++++ 
- Note: SOTA: state of the art


> There’s still an open question around where and how we want humans in the loop and what’s the right design for these systems. ([View Highlight](https://read.readwise.io/read/01h7fk1c6tx19ardpyen8nwt63))

