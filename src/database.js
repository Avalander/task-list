export const name = 'task-list'
export const version = 1

export const upgrade = upgradeDb => {
	switch (upgradeDb.oldVersion) {
		case 0:
			const list_store = upgradeDb.createObjectStore('lists', { keyPath: 'id', autoIncrement: true })
			list_store.createIndex('name', 'name', { unique: false })
			const task_store = upgradeDb.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true })
			task_store.createIndex('name', 'name', { unique: false })
			task_store.createIndex('list_id', 'list_id', { unique: false })
	}
}