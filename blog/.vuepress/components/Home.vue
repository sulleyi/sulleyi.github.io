<template>
    <div class="home">
        <div id="header">
            <div id="img-wrapper">
                <img src="TODO">
            </div>
            <div id="title">
                <Content slot-key="title" />
            </div>
        </div>
        <div id="about">
            <Content slot-key="about" />
        </div>
        <div id="post-preview">
            
        </div>
    </div>
</template>

<style lang="stylus">
	@import '/.vuepress/theme/styles/style.styl';
</style>
