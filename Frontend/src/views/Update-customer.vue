<template>
    <div class="q-gutter-md" style="max-width: 400px;">
      <q-page-container>
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="id" label="ID" readonly />
            <q-input v-model="first_name" label="First Name" />
            <q-input v-model="last_name" label="Last Name" />
            <q-input v-model="email" label="Email" />
            <q-input v-model="address" label="Address" />
            <q-input v-model="phone_number" label="Phone Number" />
            <q-btn type="submit" label="Update" color="primary" />
          </q-form>
        </q-card-section>
      </q-page-container>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  
  const id = ref(route.params.id)
  
  const first_name = ref('')
  const last_name = ref('')
  const email = ref('')
  const address = ref('')
  const phone_number = ref('')
  
  const fetchData = () => {
    fetch("http://localhost:8800/api/v1/customer/" + id.value)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          first_name.value = result.first_name
          last_name.value = result.last_name
          email.value = result.email
          address.value = result.address
          phone_number.value = result.phone_number
        }
      })
      .catch((error) => console.error('Error:', error))
  }
  
  const onSubmit = () => {
    const data = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      address: address.value,
      phone_number: phone_number.value
    }
  
    fetch("http://localhost:8800/api/v1/customer/" + id.value, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((result) => {
      alert(result.message)
      if (result.status === 'ok') {
        router.push('/');  // ไปที่หน้า home
      }
    })
    .catch((error) => console.error('Error:', error))
  }
  
  fetchData()
  </script>
  