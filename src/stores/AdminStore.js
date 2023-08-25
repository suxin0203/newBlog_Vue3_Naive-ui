import { defineStore } from "pinia"
import { getOtherswitch } from "@/api/api"


const STORE_NAME = "admin";
const TOKEN_KEY = "token";
const USERINFO_KEY = "userInfo";

export const AdminStore = defineStore(STORE_NAME, {
    state: () => {
        return {
            id: 0,
            username: "",
            nickname: "",
            avatar_url: "",
            openid: "",
            created_at: "",
            is_root: false,
            token: localStorage.getItem("token") || null,
            globalOptions: JSON.parse(localStorage.getItem('globalOptions')) || null,
        };
    },
    actions: {
        // 设置token
        setToken(token, userInfo) {
            this.token = token;
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(USERINFO_KEY, JSON.stringify(userInfo))
            // 把用户信息存储到pinia中
            this.getAdminInfo();
        },
        // 删除token
        delToken() {
            this.token = null;
            localStorage.removeItem(TOKEN_KEY);
            // 清除本地存储中的用户信息
            localStorage.removeItem(USERINFO_KEY);
        },
        // 获取用户信息
        getAdminInfo() {
            console.log('获取用户信息');
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.id = userInfo.id;
            this.username = userInfo.username;
            this.nickname = userInfo.nickname;
            this.avatar_url = userInfo.avatar_url;
            this.openid = userInfo.openid;
            this.created_at = userInfo.created_at;
            this.is_root = userInfo.is_root;
        },
        // 获取全局配置
        async getgloablOptions() {
            console.log('获取全局配置');
            const res = await getOtherswitch();
            this.globalOptions = res.data;
            // 存储全局配置到本地
            localStorage.setItem('globalOptions', JSON.stringify(res.data));
            res.data.find((item) => item.name === 'darkthem').value === 1 ? document.querySelector('html').classList.add('darklight') : '';
        },
    },
    getters: {},
})