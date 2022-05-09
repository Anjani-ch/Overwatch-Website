<template>
    <main class="main-wrapper container">
        <section>
            <h1 class="text-4xl">GitHub Pages</h1>
            
            <br>

            <p class="text-lg">GitHub Pages is a service provided by GitHub to its users for hosting static websites.</p>
            
            <br>

            <p class="text-lg">GitHub Pages requires an HTML file to run, it needs to be in your github repo aswell with your other files. The GitHub repo you create must also be a public repository.</p>
            
            <br>

            <p class="text-lg">After adding your files to your repo you need to go to the repo settings which is located in a menu on the top of you repo.</p>
            
            <br>

            <img src="../assets/gh-repo-settings.png" alt="gh-repo-settings">
            
            <br>

            <p class="text-lg">After clicking on settings you will see a tap that says "Pages", on a sidenav to the left.</p>
            
            <br>

            <img src="../assets/gh-repo-tab.png" alt="gh-repo-tab">
            
            <br>

            <p class="text-lg">Then you will see a dropdown button under source. This is were you choose your source branch. This will be the production branch that holds your production-build of your website.</p>
            
            <br>

            <img src="../assets/gh-host-branch.png" alt="gh-host-branch">
            
            <br>

            <p class="text-lg">After choosing the correct branch, hit save and wait for your website to build.</p>
            
            <br>

            <img src="../assets/gh-host-loading.png" alt="gh-host-loading">
            
            <br>

            <p class="text-lg">After your site is done building you will be notified with a success alert whit the link to your website. If you do not get the alert, try refreshing the page. When you get the alert you will also see the link where the site is hosted. Click on the link to view your hosted website.</p>
            
            <br>

            <img src="../assets/gh-host-finished.png" alt="gh-host-finished">

            <br>
            <br>

            <p class="text-lg">Here is a video going through GitHub Pages Hosting:</p>
            
            <br>
            
            <VideoJS id="gh-pages-vid" class="w-full" width="700" height="700" src="https://www.youtube.com/watch?v=SKXkC4SqtRk" />
        </section>

        <section class="mt-20">
            <h1 class="text-4xl">Heroku</h1>

            <br>

            <p class="text-lg">Heroku is a hosting service for hosting websites. You can host all types of websites with Heroku, but you will need a server regardless. If you have a singe HTML file as your website, you need to create a server to actually render that file.</p>

            <br>

            <p class="text-lg">Before proceeding you need to make sure all your code is ina public GitHub repo, and that you have an Heroku account.</p>

            <br>

            <p class="text-lg">You want to go to your projects dashboard and click "New" button to create your app.</p>

            <br>

            <img class="border-2 border-slate-900" src="../assets/heroku-dashboard.png" alt="heroku-dashboard">

            <br>
            <br>
            <br>

            <p class="text-lg">After clicking on the button you need to give your app a name, and click "Create App" button.</p>

            <br>

            <img class="border-2 border-slate-900" src="../assets/create-appname.png" alt="create-appname">

            <br>
            <br>
            <br>

            <p class="text-lg">After creating your app you will be redirected to your app's dashboard, you need to go to the deploy page and link your GitHub account.</p>

            <br>

            <img class="border-2 border-slate-900" src="../assets/heroku-click-deploy.png" alt="heroku-click-deploy">

            <br>

            <br>
            
            <img class="border-2 border-slate-900" src="../assets/heroku-connect-github.png" alt="heroku-connect-github">

            <br>
            <br>
            <br>

            <p class="text-lg">You will need to connect using GitHub authentication and allow heroku access.</p>

            <br>

            <img class="border-2 border-slate-900" src="../assets/heroku-authcate-github.png" alt="heroku-authcate-github">

            <br>
            <br>
            <br>

            <p class="text-lg">After connecting you will can search after you repository. After finding your repo, you can click "Connect".</p>

            <br>

            <img class="border-2 border-slate-900" src="../assets/heroku-search-repostory.png" alt="heroku-search-repostory">

            <br>
            <br>
            <br>

            <img class="border-2 border-slate-900" src="../assets/heroku-connect-repository.png" alt="heroku-connect-repository">

            <br>
            <br>
            <br>

            <p class="text-lg">After connectiong you can choose the branch you want to deploy, and it will automatically install all required dependencies for production.</p>

            <br>

            <img class="border-2 border-slate-900" src="../assets/heroku-deploy-reposotry.png" alt="heroku-deploy-reposotry">

            <br>
            <br>
            <br>

            <p class="text-lg">After the installation is complete and files are uploaded successfully, there will be an alert notifying the deployment success, and there will be a button to view your deployed site.</p>

            <br>

            <img class="border-2 border-slate-900" src="../assets/heroku-successful-deploy.png" alt="heroku-successful-deploy">

            <br>
            <br>

            <p class="text-lg">Here is a video going through Heroku Hosting:</p>
            
            <br>
            
            <VideoJS id="heroku-vid" class="w-full" width="700" height="700" src="https://www.youtube.com/watch?v=r2S89Hm1Uq0" />
        </section>

        <section class="mt-20">
            <h1 class="text-4xl">Comparison</h1>

            <br>

            <p class="text-lg">Heroku is a great hsoting platform because you can host any website. It provides features like automatic deployment, and a CLI tool for deployment, custom-domains, and its free. Its easy to use, and has good documentation, and is flexible. Some downsides to Heroku is the fact that you have to have a server even for static sides. Although it is not difficult, it's kind of unnesecary to do that, this is where GitHub Pages would be a better option.</p>

            <br>

            <p class="text-lg">GitHub is great for hosting static website. They give you automatic deployment, and it is easier with GitHub Pages because it is a service on GitHub, so compared to other hosting-providers this saves you time. It also has an NPM package for deploying via the command line. It offers custom-domain with free SSL certificate for https connections. The one downside to GitHub Pages is that it only supports deployment of static websites.</p>

            <br>

            <p class="text-lg">Heroku and GitHub pages are both great hosting services with different use-cases. Both are in a way better, or worse than the other because they are used for different thingg. One comon thing is that they are both free services, and good for setting up different websites or apps, either for production, testing, etc.</p>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import VideoJS from '@/components/VideoJS.vue'

export default defineComponent({
    name: 'HostingDocsView',
    components: {
        VideoJS
    }
})
</script>