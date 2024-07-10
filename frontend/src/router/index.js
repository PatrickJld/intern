import { createRouter, createWebHistory } from "vue-router";
import main from '/src/views/main_layout.vue'

import dashboard from '/src/views/dashboard.vue'
import section_dashboard from '/src/views/section_dashboard.vue'
import normalTest from '/src/views/normalTest.vue'
import epps from '/src/views/epps.vue'
import ekspresi from '/src/views/ekspresi.vue'
import kraepelin from '/src/views/kraepelin.vue'
import gambar from '/src/views/gambarTest.vue'
import hafalan from '/src/views/hafalan.vue'
import hafalanIST from '/src/views/hafalanIST.vue'
import index from '/src/views/index.vue'
import preExam from '/src/views/preExam.vue'
import biodata from '/src/views/biodata.vue'
import recruitment from '/src/views/recruitment.vue'

import admin from '/src/views/Admin/master.vue'
import dashboardAdmin from '/src/views/Admin/dashboard.vue'
import registrant from '/src/views/Admin/registrant.vue'
import test from '/src/views/Admin/test.vue'
import session from '/src/views/Admin/session.vue'
import masterRecruitment from '/src/views/Admin/recruitment.vue'
import applicant from '/src/views/Admin/applicant.vue'
import registrantDetail from '/src/views/Admin/registrantDetail.vue'
import answerDetail from '/src/views/Admin/answerDetail.vue'
import biodataRegistrant from '/src/views/Admin/biodata.vue'
import reviewEssay from '/src/views/Admin/reviewEssay.vue'
import addQuestion from '/src/views/Admin/addQuestion.vue'

import masterImgMatch from '/src/views/masterImgMatch.vue'
import masterTestResult from '/src/views/Admin/masterTestResult.vue'

// middleware
import {auth, adminAuth} from "./auth";

const routes = [
    {
        path: '/',
        name: 'index',
        component: index,
    },
    {
        path: '/recruitment',
        name: 'recruitment',
        component: recruitment,
    },
    {
        path: '/',
        name: 'main',
        component: main,
        meta: {
            middleware: auth
        },
        children: [
            {
                path: '/biodata',
                name: 'biodata',
                component: biodata,
            },
            {
                path: '/dashboard',
                name: 'dashboard',
                component: dashboard,
            },
            {
                path: '/section',
                name: 'section',
                component: section_dashboard,
            },
            {
                path: '/preExam',
                name: 'preExam',
                component: preExam,
            },
            {
                path: '/test',
                name: 'normalTest',
                component: normalTest,
            },
            {
                path: '/epps',
                name: 'epps',
                component: epps,
            },
            {
                path: '/ekspresi',
                name: 'ekspresi',
                component: ekspresi,
            },
            {
                path: '/kraepelin',
                name: 'kraepelin',
                component: kraepelin,
            },
            {
                path: '/hafalan',
                name: 'hafalan',
                component: hafalan,
            },
            {
                path: '/hafalanIST',
                name: 'hafalanIST',
                component: hafalanIST,
            },
            {
                path: '/gambar',
                name: 'gambarTest',
                component: gambar,
            },
            {
                path: '/admin',
                name: 'admin',
                component: admin,
                meta: {
                    middleware: adminAuth
                },
                children: [
                    {
                        path: '',
                        component: dashboardAdmin,
                    },
                    {
                        path: '/admin/registrant',
                        component: registrant,
                    },
                    {
                        path: '/admin/test',
                        component: test,
                    },
                    {
                        path: '/admin/session',
                        component: session,
                    },
                    {
                        path: '/admin/recruitment',
                        component: masterRecruitment,
                    },
                    {
                        path: '/admin/applicant',
                        component: applicant,
                    },
                    {
                        path: '/admin/registrantDetail',
                        name: 'registrantDetail',
                        component: registrantDetail,
                    },
                    {
                        path: '/admin/answerDetail',
                        name: 'answerDetail',
                        component: answerDetail,
                    },
                    {
                        path: '/admin/biodata',
                        name: 'biodataRegistrant',
                        component: biodataRegistrant,
                    },
                    {
                        path: '/admin/reviewEssay',
                        name: 'reviewEssay',
                        component: reviewEssay,
                    },
                    {
                        path: '/admin/question/add',
                        component: addQuestion,
                    },
                    {
                        path: '/admin/question/update',
                        component: addQuestion,
                    },
                ]
            },
        ]
    },
    {
        path: '/masterImage',
        name: 'masterImgMatch',
        component: masterImgMatch,
    },
    {
        path: '/masterTestResult',
        name: 'masterTestResult',
        component: masterTestResult,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


// Add Middleware functionality to routing
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware];

    const context = {
        from,
        next,
        router,
        to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
    }

    return next();
});


export default router