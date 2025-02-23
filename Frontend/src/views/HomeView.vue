<template>
  <div class="q-pa-md">
    <div class="q-py-md">  
    <q-btn icon="add"
      color="primary"
      label="Add Customer"
      @click="router.push('add-customer')"
    />
    </div>
    <q-table
      title="Customers"
      :rows="rows"
      :columns="columns"
      row-key="customer_id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            dense
            round
            icon="edit"
            @click="onEdit(props.row.customer_id)"
          />
          <q-btn
            flat
            dense
            round
            icon="delete"
            @click="onDelete(props.row.customer_id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'

const columns = [
  { name: 'customer_id', align: 'center', label: 'Customer ID', field: 'customer_id', sortable: true },
  { name: 'first_name', align: 'center', label: 'First Name', field: 'first_name', sortable: true },
  { name: 'last_name', align: 'center', label: 'Last Name', field: 'last_name', sortable: true },
  { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
  { name: 'address', align: 'center', label: 'Address', field: 'address', sortable: true },
  { name: 'phone_number', align: 'center', label: 'Phone Number', field: 'phone_number', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions', field: 'actions' } // Added for actions column
]

const rows = ref([])

const fetchData = async () => {
  try {
    const res = await fetch('http://localhost:8800/api/v1/customers')
    const result = await res.json()
    console.log(result) // ดูว่า API ส่งข้อมูลอะไรกลับมาบ้าง
    rows.value = result
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const onAdd = () => {
  router.push('/Add-customer')
  // ฟังก์ชันเพิ่มข้อมูล
}

const onEdit = (id) => {
  router.push('Update-customer/' +id)
  // ฟังก์ชันแก้ไขข้อมูล
}

const onDelete = (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch(`http://localhost:8800/api/v1/customer/${id}`, requestOptions)
    .then((response) => response.json())  // แก้ไขจาก .text() เป็น .json()
    .then((result) => {
      alert(result.message)
      if (result.status === 'ok') {
        fetchData();  // รีโหลดข้อมูลใหม่หลังจากลบเสร็จ
      }
    })
    .catch((error) => console.error('Error:', error));  //ลบข้อมูล
}


fetchData()
</script>
