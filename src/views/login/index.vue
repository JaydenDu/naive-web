<template>
  <div class="h-full w-full flex-col bg-[url(@/assets/images/login_bg.webp)] bg-cover">
    <div
      class="m-auto max-w-700 min-w-345 flex items-center justify-center rounded-8 bg-white bg-opacity-20 bg-cover p-12 card-shadow dark:bg-dark"
    >
      <div class="hidden w-380 px-20 py-35 md:block">
        <img src="@/assets/images/login_banner.webp" class="w-full" alt="login_banner" />
      </div>

      <div class="w-320 flex flex-col px-20 py-32">
        <h2 class="flex items-center justify-between text-24 text-#6a6a6a font-normal">
          <img src="@/assets/images/logo.png" class="mr-12 h-50" />
          <span>
            {{ title }}
          </span>
        </h2>
        <n-input
          v-model:value="loginInfo.username"
          autofocus
          class="mt-32 h-40 items-center"
          placeholder="请输入用户名"
          :maxlength="20"
        >
          <template #prefix>
            <i class="i-fe:user mr-12 opacity-20" />
          </template>
        </n-input>
        <n-input
          v-model:value="loginInfo.password"
          class="mt-20 h-40 items-center"
          type="password"
          show-password-on="mousedown"
          placeholder="请输入密码"
          :maxlength="20"
          @keydown.enter="handleLogin()"
        >
          <template #prefix>
            <i class="i-fe:lock mr-12 opacity-20" />
          </template>
        </n-input>

        <n-checkbox
          class="mt-20"
          :checked="isRemember"
          label="Remember"
          :on-update:checked="(val) => (isRemember = val)"
        />

        <div class="mt-20 flex items-center">
          <n-button
            class="h-40 flex-1 rounded-5 text-16"
            type="primary"
            ghost
            @click="quickLogin()"
          >
            注册
          </n-button>

          <n-button
            class="ml-32 h-40 flex-1 rounded-5 text-16"
            type="primary"
            :loading="loading"
            @click="handleLogin()"
          >
            登录
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { lStorage } from '@/utils'
import { useStorage } from '@vueuse/core'
import api from './api'
import { useAuthStore } from '@/store'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const title = 'Naive web Pool'

const loginInfo = ref({
  username: '',
  password: '',
})

const localLoginInfo = lStorage.get('loginInfo')
if (localLoginInfo) {
  loginInfo.value.username = localLoginInfo.username || ''
  loginInfo.value.password = localLoginInfo.password || ''
}

function quickLogin() {
  loginInfo.value.username = 'admin'
  loginInfo.value.password = '123456'
  handleLogin(true)
}

const isRemember = useStorage('isRemember', true)
const loading = ref(false)
async function handleLogin(isQuick) {
  const { username, password, captcha } = loginInfo.value
  if (!username || !password) return $message.warning('请输入用户名和密码')
  if (!isQuick && !captcha) return $message.warning('请输入验证码')
  try {
    loading.value = true
    $message.loading('正在验证，请稍后...', { key: 'login' })
    const { data } = await api.login({ username, password: password.toString(), captcha, isQuick })
    if (isRemember.value) {
      lStorage.set('loginInfo', { username, password })
    } else {
      lStorage.remove('loginInfo')
    }
    onLoginSuccess(data)
  } catch (error) {
    // 10003为验证码错误专属业务码
    $message.destroy('login')
    console.error(error)
  }
  loading.value = false
}

async function onLoginSuccess(data = {}) {
  authStore.setToken(data)
  $message.loading('登录中...', { key: 'login' })
  try {
    $message.success('登录成功', { key: 'login' })
    if (route.query.redirect) {
      const path = route.query.redirect
      delete route.query.redirect
      router.push({ path, query: route.query })
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error(error)
    $message.destroy('login')
  }
}
</script>
