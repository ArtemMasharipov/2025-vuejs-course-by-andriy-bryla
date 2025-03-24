<template>
  <v-container fluid>
    <!-- Non-Vuetify Examples -->
    <v-card class="section-card" color="grey-lighten-5" elevation="2">
      <v-card-title class="text-h5 bg-amber-lighten-3">
        Урок №14. Практика. Fomtawesom. Vuetify.
      </v-card-title>
      <v-card-text>
        <v-row>
          <!-- First example -->
          <v-col cols="12" md="4">
            <div class="example-container">
              <paginated-comp title="Список працівників" :workers-list="workersList" />
            </div>
          </v-col>
          
          <!-- Second example -->
          <v-col cols="12" md="4">
            <div class="example-container">
              <paginated-comp-exp :workersList="workersList" />
            </div>
          </v-col>

          <!-- Third example with custom slots -->
          <v-col cols="12" md="4">
            <div class="example-container">
              <paginated-comp
                title="Стаж працівників"
                :workers-list="workersList"
                :initial-page-index="outerCurrentPageIndex"
              >
                <template #header="{ workersList }">
                  Всього - {{ workersList.length }} осіб
                </template>
                <template #default="{ currentPageWorkersList }">
                  <div v-for="worker in currentPageWorkersList" :key="worker.id">
                    {{ worker.name }} - {{ worker.experience }}
                  </div>
                </template>
                <template #footer="{ pagesNumber, currentPage }">
                  <div class="d-flex align-center">
                    <button 
                      class="paginated-btn"
                      :disabled="currentPage === 1" 
                      @click="outerCurrentPageIndex--"
                    >
                     <=
                    </button>
                    <button
                      class="paginated-btn"
                      :disabled="currentPage === pagesNumber"
                      @click="outerCurrentPageIndex++"
                    >
=>                    </button>
                  </div>
                </template>
              </paginated-comp>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Vuetify Examples -->
    <v-card class="section-card" color="grey-lighten-5" elevation="2">
      <v-card-title class="text-h5 bg-blue-lighten-4">
        Homework
      </v-card-title>
      <v-card-text>
        <v-row>
          <!-- Basic Navigation Example -->
          <v-col cols="12" md="6">
            <div class="example-container">
              <paginated-comp-with-mode
                title="Список працівників (Basic Navigation)"
                :workers-list="workersList"
                :mode="2"
                navMode="basic"
              />
            </div>
          </v-col>
          
          <!-- Arrow Navigation Example -->
          <v-col cols="12" md="6">
            <div class="example-container">
              <paginated-comp-with-mode
                title="Список працівників (Arrow Navigation)"
                :workers-list="workersList"
                :mode="1"
                navMode="arrow"
              />
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import PaginatedCompWithMode from '@/components/test_dyn_comp/PaginatedCompWithMode.vue'
import PaginatedComp from '@/components/test_slots/PaginatedComp.vue'
import PaginatedCompExp from '@/components/test_slots/PaginatedCompExp.vue'

export default {
  name: 'NavigationExamplesWrapper',
  
  components: {
    PaginatedComp,
    PaginatedCompExp,
    PaginatedCompWithMode,
  },

  data() {
    return {
      workersList: [
        { id: 1, name: 'Andrii Ivanov', experience: 5, salary: 35000 },
        { id: 2, name: 'Olha Petrenko', experience: 8, salary: 42000 },
        { id: 3, name: 'Serhiy Shevchenko', experience: 2, salary: 28000 },
        { id: 4, name: 'Yuliia Kovalenko', experience: 10, salary: 50000 },
        { id: 5, name: 'Dmytro Bondarenko', experience: 3, salary: 31000 },
        { id: 6, name: 'Mykola Tkachenko', experience: 7, salary: 39000 },
        { id: 7, name: 'Iryna Samoilova', experience: 1, salary: 25000 },
        { id: 8, name: 'Oleksiy Hryhorenko', experience: 4, salary: 33000 },
        { id: 9, name: 'Natalia Voloshyna', experience: 6, salary: 37000 },
        { id: 10, name: 'Oksana Fedorova', experience: 9, salary: 45000 },
        { id: 11, name: 'Bohdan Kuznetsov', experience: 12, salary: 53000 },
        { id: 12, name: 'Kateryna Savchenko', experience: 5, salary: 35000 },
        { id: 13, name: 'Vadym Poltavets', experience: 3, salary: 31000 },
        { id: 14, name: 'Tetyana Kravchuk', experience: 8, salary: 42000 },
        { id: 15, name: 'Oleh Zakharchenko', experience: 7, salary: 39000 },
        { id: 16, name: 'Anastasiya Kostenko', experience: 2, salary: 28000 },
        { id: 17, name: 'Yevhenii Pylypenko', experience: 10, salary: 50000 },
        { id: 18, name: 'Svitlana Shcherbak', experience: 6, salary: 37000 },
        { id: 19, name: 'Oleksandra Marchenko', experience: 4, salary: 33000 },
        { id: 20, name: 'Roman Kolomiets', experience: 1, salary: 25000 },
      ],
      outerCurrentPageIndex: 1,
    }
  },
}
</script>

<style lang="scss" scoped>
.examples-container {
  padding: 20px;
}
</style>
