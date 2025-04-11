<script setup>
import { inject, onMounted } from 'vue';

// Get the page title functionality from MasterPageLayout
const { setPageTitle } = inject('pageTitle');

// Set the page title on component mount
onMounted(() => {
  setPageTitle('Про додаток "Подарунки Миколая"');
});

const statuses = [
  { name: 'Заплановано', color: 'warning', icon: 'mdi-calendar-clock' },
  { name: 'Придбано', color: 'info', icon: 'mdi-shopping' },
  { name: 'Подаровано', color: 'success', icon: 'mdi-gift' }
];

const appVersion = "1.0.0";
</script>

<template>
    <div class="about entity-list-container">
        <v-card class="mb-6">
            <v-card-text>
                <p>
                    "Подарунки Миколая" - це зручний додаток для організації та управління подарунками для ваших друзів.
                    Програма розроблена з використанням сучасних технологій, що забезпечує швидку та надійну роботу.
                </p>

                <p class="mt-4 ">
                    <strong>Основні функції:</strong>
                </p>
                <ul class="pa-7">
                    <li>Створення та редагування списку друзів</li>
                    <li>Додавання та організація потенційних подарунків</li>
                    <li>Призначення подарунків конкретним друзям</li>
                    <li>Відстеження статусу подарунків (заплановано, придбано, подаровано)</li>
                    <li>Сортування друзів, подарунків та призначень</li>
                </ul>
            </v-card-text>
        </v-card>

        <v-row>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>Технології</v-card-title>
                    <v-card-text>
                        <v-list lines="two">
                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-icon color="success">mdi-vuejs</v-icon>
                                </template>
                                <v-list-item-title>Vue 3</v-list-item-title>
                                <v-list-item-subtitle>
                                    Прогресивний JavaScript фреймворк з Composition API для побудови користувацьких
                                    інтерфейсів
                                </v-list-item-subtitle>
                            </v-list-item>

                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-icon color="primary">mdi-database</v-icon>
                                </template>
                                <v-list-item-title>Firebase Firestore</v-list-item-title>
                                <v-list-item-subtitle>
                                    Хмарна база даних для зберігання друзів, подарунків та їх призначень
                                </v-list-item-subtitle>
                            </v-list-item>

                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-icon color="info">mdi-routes</v-icon>
                                </template>
                                <v-list-item-title>Vue Router</v-list-item-title>
                                <v-list-item-subtitle>
                                    Для навігації між сторінками додатку
                                </v-list-item-subtitle>
                            </v-list-item>

                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-icon color="secondary">mdi-store</v-icon>
                                </template>
                                <v-list-item-title>Pinia</v-list-item-title>
                                <v-list-item-subtitle>
                                    Для управління станом додатку та ефективної взаємодії компонентів
                                </v-list-item-subtitle>
                            </v-list-item>

                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-icon color="purple">mdi-material-design</v-icon>
                                </template>
                                <v-list-item-title>Vuetify</v-list-item-title>
                                <v-list-item-subtitle>
                                    Бібліотека Material Design компонентів для Vue
                                </v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>Мета додатку</v-card-title>
                    <v-card-text>
                        <p class="mb-4">
                            Наш додаток створений для допомоги в організації подарунків для друзів та близьких.
                            З "Подарунками Миколая" ви більше ніколи не забудете підготувати подарунок на важливу подію.
                        </p>

                        <p class="mb-4">
                            Відстежуйте статус подарунків, зберігайте ідеї для майбутніх подарунків, й забезпечте, щоб
                            кожен отримав
                            саме те, що йому сподобається.
                        </p>

                        <v-alert color="info" icon="mdi-gift" variant="tonal" class="mb-4">
                            <strong>Порада:</strong> Додайте посилання на подарунки, щоб швидко переходити до сайтів
                            магазинів.
                        </v-alert>

                        <v-divider class="mb-4"></v-divider>

                        <div class="d-flex justify-center">
                            <v-chip v-for="(status, i) in statuses" :key="i" :color="status.color" class="mx-2">
                                <v-icon start>{{ status.icon }}</v-icon>
                                {{ status.name }}
                            </v-chip>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Removed duplicate footer -->
    </div>
</template>

<style>
.about {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
