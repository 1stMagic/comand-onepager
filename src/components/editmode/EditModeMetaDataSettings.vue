<template>
    <CmdBox :use-slots="['body']" :collapsible="true"
            :cmdHeadline="{headlineText: 'Meta Data Settings', headlineLevel: 4, headlineIcon: {iconClass: 'icon-globe'}}"
            :openCollapsedBox="openBoxStatus">
        <template v-slot:body>
            <div class="flex-container vertical">
                <h4>Meta Data</h4>
                <CmdFormElement
                    element="input"
                    type="text"
                    labelText="Title"
                    placeholder="Title of this page"
                    v-model="title"
                    :required="true"
                    max-length="255"
                />
                <CmdFormElement
                    element="textarea"
                    labelText="Meta Description"
                    placeholder="Meta Description"
                    v-model="metaDescription"
                    :required="true"
                    maxlength="160"
                />
                <CmdFormElement
                    element="select"
                    labelText="Rating"
                    v-model="metaRating"
                    :selectOptions="ratingOptions"
                />
                <CmdFormElement
                    element="select"
                    labelText="Robots"
                    :required="true"
                    v-model="metaRobots"
                    :selectOptions="robotsOptions"
                />
                <CmdFormElement
                    element="input"
                    type="text"
                    labelText="Author"
                    placeholder="Author of this page"
                    v-model="metaAuthor"
                    max-length="255"
                />
            </div>
        </template>
    </CmdBox>
</template>

<script>
export default {
    name: "EditModeMetaDataSettings",
    inject: ["editModeContext"],
    data() {
        return {
            openBoxStatus: false,
            title: "",
            metaDescription: "",
            metaRobots: "index",
            robotsOptions: [
                {
                    text: "index/follow",
                    value: "index/follow"
                },
                {
                    text: "index/nofollow",
                    value: "index/nofollow"
                },
                {
                    text: "noindex/follow",
                    value: "noindex/follow"
                },
                {
                    text: "noindex/nofollow",
                    value: "noindex/nofollow"
                }
            ],
            metaRating: "",
            ratingOptions: [
                {
                    text: "Please select...",
                    value: ""
                },
                {
                    text: "general",
                    value: "general"
                },
                {
                    text: "mature",
                    value: "mature"
                },
                {
                    text: "restricted",
                    value: "restricted"
                },
                {
                    text: "adult",
                    value: "adult"
                },
                {
                    text: "14 years",
                    value: "14-years"
                },
                {
                    text: "safe for kids",
                    value: "safe-for-kids"
                }
            ],
            metaAuthor: ""
        }
    },
    props: {
      openBox: {
          type: Boolean,
          required: false
      }
    },
    watch: {
        openBox: {
            handler() {
                this.openBoxStatus = this.openBox
            },
            immediate: true
        },
        metaData: {
            handler() {
                if (this.metaData) {
                    this.title = this.metaData.title || ""
                    this.metaDescription = this.metaData.description || ""
                    this.metaRating = this.metaData.rating || "general"
                    this.metaRobots = this.metaData.robots || "index/follow"
                    this.metaAuthor = this.metaData.author || ""
                }
            },
            immediate: true,
            deep: true
        }
    }
}
</script>

<style>

</style>