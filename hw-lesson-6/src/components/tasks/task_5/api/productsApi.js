import { notebookCardsSources } from '@/components/tasks/task_5/data/productCards'

export const fetchProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(notebookCardsSources)
        }, 1500)
    })
}
