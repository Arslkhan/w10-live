<template>

<div class="col-md-12">
<div class="sociallinks middle-xs center-xs">
<p><a href="https://www.facebook.com/W10Drinkware" target="_blank" rel="noopener"><img v-lazy="'/assets/facebook.png'" height="76px" alt="facebook"></a> <a href="https://youtu.be/GwnD4-rkWoc" target="_blank" rel="noopener"><img v-lazy="'/assets/youtube.png'" height="76px" alt="youtube"></a></p>
</div>
<div class="fb-block container w-100 p0">
    <div class="row">
        <div class="col-sm-2"></div>
        <cms-block class="col-sm-4 middle-xs center-xs" :identifier="'homepage-social-one'" />
    <cms-block class="col-sm-4 middle-xs center-xs" :identifier="'homepage-social-two'" />
    <div class="col-sm-2"></div>
    </div>
    
    <!--<div class="powr-social-feed" id="2d7e66f6_1593611927"></div>
    <div class="blocker"></div>-->
</div>

<div class="insta-block container w-100 p0">
        <div class="row py20 insta-row">
            <div class="col-md-12 center-xs">
               
                    <a href="https://www.instagram.com/w10.world" rel="noopener" target="_blank" class="middle-xs center-xs cl-text"><img v-lazy="'/assets/instagram.png'" height="76px" alt="Instagram Logo" class="insta-logo" /></a>
               
                <div class="container mt20">
                    <!-- LightWidget WIDGET -->
                   <iframe src="//lightwidget.com/widgets/16cbb85b0b465d7eafd8eb42e7f1b039.html" scrolling="no" allowtransparency="true" class="lightwidget-widget" style="width:100%;border:0;overflow:hidden;"></iframe>
                </div>
                <footer class="center-xs py20">
                    <a href="https://www.instagram.com/w10.world" rel="noopener" target="_blank" class="uppercase cl-text weight-600 fs-small no-underline r-more"><img v-lazy="'/assets/instafollow.gif'" alt="Navigation"/></a>
                </footer>
            </div>
        </div>
  </div>


</div>
    

</template>
<script>
    import CmsBlock from 'theme/components/core/blocks/Cms/Block'

    export default {
        name: 'SocialArea',
        components: {
        CmsBlock
        },
        mounted() {
            let InstaScript = document.createElement('script')
            InstaScript.setAttribute('src', 'https://cdn.lightwidget.com/widgets/lightwidget.js')
            document.head.appendChild(InstaScript)
            //let FBScript = document.createElement('script')
            //FBScript.setAttribute('src', 'https://www.powr.io/powr.js?platform=html')
            //document.head.appendChild(FBScript)
            //console.log(window.frames[1]    );
            //document.frames[0].contentDocument.getElementsByClassName('js-powrMark').style['display']=none;

        }
       
    }
</script>
<style scoped>
p{font-size: 14px; padding: 0 100px;}
</style>
<style lang="scss">

.sociallinks{text-align: center; padding: 70px 0 0 0;}
.sociallinks a{padding-right: 10px;}
.sociallinks a:hover{text-decoration: none;}

  .blocker{
background-color: #fff;
    z-index: 99999;
    width: 100%;
    height: 174px;
    position: absolute;
    margin-top: -168px;
}
 @media (max-width: 767px) {
.blocker {
    background-color: #fff;
    z-index: 99999;
    width: 100%;
    height: 120px;
    position: absolute;
    margin-top: -133px;
}
 }
 @media (max-width: 330px){

.blocker {
    background-color: #fff;
    z-index: 99999;
    width: 100%;
    height: 192px;
    position: absolute;
    margin-top: -190px;
}
}
</style>
