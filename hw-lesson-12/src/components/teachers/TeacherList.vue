<template>
  <div class="card">
    <h2>{{ lessonTitle }}</h2>
    
    <loading-spinner v-if="loading" message="Loading teachers..." />
    <div v-else-if="teachers.length === 0" class="no-data">No teachers available for this lesson</div>
    <div v-else class="teacher-options">
      <div class="form-group">
        <label :for="`teacher-select-${lessonId}`" class="selection-instruction">Select a teacher:</label>
        <select 
          :id="`teacher-select-${lessonId}`" 
          v-model="selectedTeacher"
          class="teacher-select"
          @change="handleTeacherSelection"
        >
          <option value="" disabled>-- Select a teacher --</option>
          <option 
            v-for="teacher in teachers" 
            :key="teacher.id"
            :value="teacher.id"
          >
            {{ teacher.name }} (Experience: {{ teacher.experience }})
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

export default {
  name: 'TeacherList',
  components: {
    LoadingSpinner
  },
  props: {
    lessonId: {
      type: Number,
      required: true
    },
    lessonTitle: {
      type: String,
      required: true
    },
    teachers: {
      type: Array,
      required: true
    },
    selectedTeacherId: {
      type: Number,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select-teacher'],
  data() {
    return {
      selectedTeacher: this.selectedTeacherId || ''
    };
  },
  watch: {
    selectedTeacherId(newValue) {
      this.selectedTeacher = newValue || '';
    }
  },
  methods: {
    handleTeacherSelection() {
      if (this.selectedTeacher) {
        this.$emit('select-teacher', { 
          lessonId: this.lessonId, 
          teacherId: parseInt(this.selectedTeacher)
        });
      }
    }
  }
}
</script>

<style scoped>
.teacher-options {
  display: flex;
  flex-direction: column;
}

.selection-instruction {
  font-weight: 500;
  margin-bottom: 10px;
}

.teacher-select {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  background-color: white;
}

.teacher-select:focus {
  border-color: var(--color-heading);
  outline: none;
}
</style>
