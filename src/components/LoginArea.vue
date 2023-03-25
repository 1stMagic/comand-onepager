<template>
    <CmdForm v-if="!loginStatus" @submit="login" :textLegend="cmdForm.login" :showLegend="cmdForm.showLegend">
        <CmdSystemMessage v-if="error && systemMessage" :systemMessage="systemMessage" validationStatus="error" />
        <CmdFormElement element="input" type="password" :labelText="passwordLabelText" :placeholder="passwordLabelText" v-model="password" />
        <div class="button-wrapper">
            <CmdFormElement element="button" :native-button="{text: submitButtonText}" />
        </div>
    </CmdForm>
    <div v-else>
        <h2>Downloads</h2>
        <ul>
            <li><a href="#" data-filename="test.pdf" @click.prevent="downloadFile" target="_blank">PDF</a></li>
        </ul>
    </div>
</template>

<script>
import {mapActions, mapState} from "pinia"
import {usePiniaStore} from "../stores/pinia"
export default {
    name: "LoginArea",
    data() {
        return {
            loginStatus: false,
            password: "",
            error: false,
            systemMessage: ""
        }
    },
    props: {
        baseUrl: {
            type: String,
            required: true
        },
        cmdForm: {
            type: Object,
            default () {
                return {
                    textLegend: "Login",
                    showLegend: true
                }
            }
        },
        passwordLabelText: {
            type: String,
            default: "Password"
        },
        submitButtonText: {
            type: String,
            default: "Login"
        }
    },
    computed: {
        ...mapState(usePiniaStore, ["authToken"])
    },
    methods: {
        ...mapActions(usePiniaStore, ["setAuthToken", "deleteAuthToken"]),

        login() {
            const formData = new FormData()
            formData.set("username", "admin")
            formData.set("password", this.password)
            const url = new URL(this.baseUrl + "/auth/login")
            const options = {
                method: "POST",
                body: formData
            }
            this.loginStatus = false

            fetch(url.href, options)
                .then(response => {
                    if (response.ok) {
                        return response.text()
                    }
                    throw new Error(response.status + " " + response.statusText)
                })
                .then(token => {
                    this.setAuthToken(token)
                    this.loginStatus = true
                    this.error = false
                    this.systemMessage = ""
                })
                .catch(error => {
                    this.error = true
                    this.systemMessage = error
                })
        },
        downloadFile(event) {
            const url = new URL(this.baseUrl + "/files/download")
            url.searchParams.set("filename", event.target.dataset.filename)
            const options = {
                headers: {
                    Authorization: "Bearer " + this.authToken
                }
            }
            const fileInfo = {}
            fetch(url.href, options)
                .then(response => {
                    fileInfo.fileName = response.headers.get("x-op-filename")
                    return response.blob()
                })
                .then(data => new File([data], fileInfo.fileName))
                .then(file => open(URL.createObjectURL(file)))
                .catch(error => console.error(error))
        }
    }
}
</script>

<style>

</style>