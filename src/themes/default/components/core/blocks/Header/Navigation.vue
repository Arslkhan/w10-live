<template>
    <div class="navdesktopleft">
        <ul class="p0 m0 inline-flex nav-menu">
            <li :key="category.id" v-for="category in visibleCategories" @mouseover="selectIndex(category.id);" @mouseout="ItemIndex = null;">
                <nav-btn
                    v-if="category.children_count > 0"
                    @show_event="onHover"
                    type="menu"
                    class="bg-cl-transparent customp weight-500 brdr-none fs-medium-small"
                    :id="category.id"
                    :name="category.name"
                />
                <router-link
                    v-else
                    class="bg-cl-transparent customp weight-500 brdr-none fs-medium-small inline-flex between-xs w-100 p15 cl-accent no-underline"
                    :to="categoryLink(category)"
                >
                    {{ category.name }} 
                </router-link>
                <section 
                    v-show="ItemIndex ==  category.id" 
                    @mouseover="mouseOver" 
                    @mouseleave="mouseOut"
                    :class="getMenuType(category.id)">
                    <nav-category
                        :category-links="category.children_data"
                        :id="category.id"
                        :parent-slug="category.slug"
                        :parent-path="category.url_path"
                        :menu-type="'menu'"
                    />
                </section>
            </li>
            
           
            
            
            
        </ul>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import i18n from '@vue-storefront/i18n'
    import SidebarMenu from '@vue-storefront/core/compatibility/components/blocks/SidebarMenu/SidebarMenu'
    import NavBtn from 'theme/components/core/blocks/Header/NavBtn'
    import NavCategory from 'theme/components/core/blocks/Header/NavCategory'
    import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'

    export default {
        name: 'Navigation',
        data() {
            return {
                active: false,
                ItemIndex: null
            }
        },
        components: {
            NavBtn,
            NavCategory
        },
        mixins: [SidebarMenu],
        watch:{
            $route (to, from){
                this.active = false;   
            }
        }, 
        computed: {
            visibleCategories () {
                return this.categories.filter(c => { return c.include_in_menu === true })
            }
        },
        methods: {
            categoryLink (category) {
                return formatCategoryLink(category)
            },
            getMenuType(id){
            if(id == 68){
                return "section-menu-full"
            }else if(id== 31){
               return "section-menu-mini" 
            }else if(id== 48){
               return "section-menu-mini-2" 
            }else{
                return "nomenu"
            }
            },
            onHover (value, type) {
                this.active = value
            },
            mouseOver: function() {
                this.active = true;   
            },
            mouseOut: function() {
                this.active = false;   
            },
            selectIndex(Index) {
            this.ItemIndex = Index;
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$bg-secondary: color(secondary, $colors-background);
$text-color: #363b51;
$line-color: #98694b;
.navdesktopleft{float: left;}
ul {
    list-style-type: none; 

    li {
        &:hover,
        &:focus {
            background-color: #3b477a;
            
            button:before {
                opacity: 1;
            }
            a,button{color:#fff !important;}
        }
        button, a {
            color: $text-color;
            position: relative;
            &:focus,
            &:active,
            &:hover {
                color:#fff !important;
                &:before {
                    opacity: 1;
                }
            }
        }
    }
.customp{padding: 15px 15px 20px 15px;}
    .section-menu-full {
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;
        padding: 40px;
        background-color: #ffffff;
        border-top:5px solid #3b477a;
        -webkit-box-shadow: 0px -0px 10px rgba(0, 0, 0, 0.25);
        -moz-box-shadow: 0px -0px 10px rgba(0, 0, 0, 0.25);
        box-shadow: 0px -0px 10px rgba(0, 0, 0, 0.25);
        max-height: 515px;
        overflow: hidden;
    }
    .section-menu-mini {
        position: absolute;
        top: 100%;
        background-color: #ffffff;
        border-top:5px solid #3b477a;
        -webkit-box-shadow: 0px -0px 10px rgba(0, 0, 0, 0.25);
        -moz-box-shadow: 0px -0px 10px rgba(0, 0, 0, 0.25);
        box-shadow: 0px -0px 10px rgba(0, 0, 0, 0.25);
        max-height: 515px;
        overflow: hidden;
         width: 600px;
    }

    .section-menu-mini-2 {
        position: absolute;
        top: 100%;
        background-color: #ffffff;
        border-top:5px solid #3b477a;
        -webkit-box-shadow: 0px -0px 10px rgba(0, 0, 0, 0.25);
        -moz-box-shadow: 0px -0px 10px rgba(0, 0, 0, 0.25);
        box-shadow: 0px -0px 10px rgba(0, 0, 0, 0.25);
        max-height: 515px;
        overflow: hidden;
         width: 260px;
    }
    .nomenu{display: none;}
    
}
</style>