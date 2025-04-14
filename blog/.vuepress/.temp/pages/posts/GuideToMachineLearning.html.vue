<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<blockquote>
<p>{{ $frontmatter.description }}</p>
</blockquote>
<p>I'll be compiling some of my favorite machine learning resources <RouteLink to="/resources.html#machine-learning">here</RouteLink>.
I will try to keep that list as up-to-date as possible. I will be further documenting my progress and insights here.</p>
<p><em>Machine Learning, Artificial Intelligence, Neural Networks, Deep Learning</em>, yada yada yada... I'm sure you've heard the buzzwords by now.
I hope that with this guide I can help demystify some of the hype and explain the fundamental ideas and math these concepts stem from. While you don't need a deep understanding of these topics to implement machine learning, if you want to do more than copy and paste other people's algorithms I highly recommend you take the time to really learn these areas.</p>
<h2 id="the-core-statistics-linear-algebra-and-a-pinch-of-calculus-just-for-fun" tabindex="-1"><a class="header-anchor" href="#the-core-statistics-linear-algebra-and-a-pinch-of-calculus-just-for-fun"><span>The Core: Statistics, Linear Algebra, and a pinch of Calculus just for fun</span></a></h2>
<p>At its core, machine learning problems are really statistical optimization problems. The goal is always to model a set of data with an the best equation possible, a hypothesis. This is the same thing statisticians do. The only difference is, you are automating the process of finding this equation by having the computer do it for you. Now, in order to actually generate these equations you need linear algebra. Because we are working with large data sets with many parameters to measure them, the fastest way to compute these values is using matrix and vector operations. Then, in order to see if the model is actually doing a good job of accurately fitting our data we need Calculus. We use another equation, called the cost function, to see how far off our hypothesis is from the actual data set. One example of a cost function is MSE, or mean square error. you subtract the squared actual from the squared hypothesis value to see the difference. Then we use derivatives to measure the slope of the cost function as you test each data point. The smaller the slope the better the guess, or if the slope is steeper the farther you are from an accurate model.</p>
<h3 id="math-resources" tabindex="-1"><a class="header-anchor" href="#math-resources"><span>Math Resources</span></a></h3>
<p>I really enjoy MIT's Open Courseware platform in order to receive a world class education for free! Here are some of my favorite resources for learning the math behind machine learning. You don't need to complete all of these resources in their entirety, but they are very helpful to refer back to while you are implementing your own code or project.</p>
<p><strong>Learn About Linear Algebra</strong></p>
<ul>
<li><a href="https://ocw.mit.edu/courses/mathematics/18-06sc-linear-algebra-fall-2011/" target="_blank" rel="noopener noreferrer">MIT Linear Algebra</a></li>
</ul>
<p><strong>Learn about statistics and how to apply it to computer science</strong></p>
<ul>
<li><a href="https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-0002-introduction-to-computational-thinking-and-data-science-fall-2016/index.htm" target="_blank" rel="noopener noreferrer">MIT Introduction to computational Thinking and Data Science</a></li>
</ul>
<p><strong>Learn about Calculus</strong></p>
<ul>
<li>
<p><a href="https://tutorial.math.lamar.edu/" target="_blank" rel="noopener noreferrer">Paul's Online Math Notes</a></p>
</li>
<li>
<p><a href="https://www.youtube.com/user/professorleonard57" target="_blank" rel="noopener noreferrer">Professor Leonard on Youtube</a></p>
</li>
</ul>
<h2 id="bringing-it-all-together" tabindex="-1"><a class="header-anchor" href="#bringing-it-all-together"><span>Bringing it all together</span></a></h2>
<p><a href="https://www.coursera.org/learn/machine-learning" target="_blank" rel="noopener noreferrer">Andrew Ng's Introduction to Machine Learning</a> is one of the most popular introductory machine learning courses and for good reason. Andrew is an incredibly knowledgeable instructor and his course is well worth your time. This is where I began my journey with machine learning. It has a bottom up approach so the first few weeks may feel a bit daunting, but if you stick with it I'm sure you will get the hang of it. If you have trouble following along with the math, refer to the resources I linked above to help you follow along. Throughout the course, The assignments and demos are designed to be completed in Octave or MATLAB (They are nearly identical pieces of software, octave is a free and open source version while MATLAB is developed and supported by MathWorks). I have linked a great resource for learning MATLAB/Octave below.</p>
<h3 id="machine-learning-software-resources" tabindex="-1"><a class="header-anchor" href="#machine-learning-software-resources"><span>Machine Learning Software Resources</span></a></h3>
<ul>
<li><a href="https://ocw.mit.edu/courses/mathematics/18-s997-introduction-to-matlab-programming-fall-2011/index.htm" target="_blank" rel="noopener noreferrer">MIT Introduction to MATLAB</a></li>
</ul>
<h2 id="going-forward" tabindex="-1"><a class="header-anchor" href="#going-forward"><span>Going Forward</span></a></h2>
<p>I am currently on this learning journey myself and will continue to add to and update this guide as I progress. I hope this serve as a helpful starting point for you and make sure to check back in the future for more content!</p>
</div></template>


