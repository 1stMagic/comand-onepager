<template>
    <!-- begin inner_wrapper -->
    <div class="grid-main-item_inner-wrapper" id="inner_wrapper">
        <!-- begin content_wrapper -->
        <div id="content_wrapper"><!-- no row allowed -->
            <!-- begin content -->
            <main class="grid-item_main">
                <!-- begin main content -->
                <div class="grid-item_page-content" id="page_content">
                    <div class="section_wrapper" id="headline_wrapper">
                        <a id="anchor_section1"></a>
                        <section>
                                <h1></h1>
                        </section>
                    </div>
                    <content-section v-for="section in sections" v-bind:key="section.id" v-bind:id="section.id" v-bind:headline="section.headline" v-bind:content="section.content"></content-section>
                    <div class="section_wrapper">
                        <a id="anchor_section2"></a>
                        <section>
                            <h2>Headline Section 2</h2>
                            <div class="grid-container-create-columns">
                                <div class="grid-small-item">
                                    <img src="../assets/logo_business_edition_landscape.jpg" alt="image 1" />
                                </div>
                                <div class="grid-large-item">

                                    <p>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
                                    </p>
                                    <p>
                                    Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. <br />Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="section_wrapper">
                        <a id="anchor_section3"></a>
                        <section>
                            <h2>Headline Section 3</h2>
                            <div class="grid-container-create-columns">
                                <div class="grid-small-item">
                                   <img src="../assets/logo_business_edition_landscape.jpg" alt="image 2" />
                                </div>
                                <div class="grid-small-item">
                                   <img src="../assets/logo_business_edition_landscape.jpg" alt="image 3" />
                                </div>
                                <div class="grid-small-item">
                                   <img src="../assets/logo_business_edition_landscape.jpg" alt="image 4" />
                                </div>
                                <div class="grid-small-item">
                                   <img src="../assets/logo_business_edition_landscape.jpg" alt="image 5" />
                                </div>
                           </div>
                        </section>
                    </div>
                    <div class="section_wrapper">
                        <a id="anchor_section4"></a>
                        <section>
                            <h2>Headline Section 4</h2>
                            <contact-form />
                        </section>
                    </div>
                </div>
                <!-- end main content -->
            </main>
            <!-- content end -->
        </div>
        <!-- end content_wrapper end -->
    </div>
    <!-- end inner_wrapper -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import Languages from '@/language.js'
import ContactForm from '@/components/ContactForm.vue';
import ContentSection from '@/components/ContentSection.vue';
import sectionContent from '@/assets/content_sections.json';

@Component ({
    components: {
    ContentSection,
    ContactForm
    }
})

export default class InnerWrapper extends Vue {
    sections: any[] = [];

    created(): void {
        this.sections = sectionContent;
    }
}

</script>