const redis = require('redis')

const completedTasks = redis.createClient()
const pendingTasks = redis.createClient()

pendingTasks.subscribe('pending_tasks')
pendingTasks.on('message', (channel, taskInfo)=>{
	runNewTask(JSON.parse(taskInfo))
})

const runNewTask = taskInfo =>{
	setTimeout(()=>{
		completedTasks.publish('completed_tasks', taskInfo.id)
	}, Math.ceil(Math.random()*5000))
}