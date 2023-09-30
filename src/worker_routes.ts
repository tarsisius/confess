import { Router } from 'itty-router'
import registerUser from '@/modules/users/register'
import viewHome from '@/modules/views/home'
import viewDashboard from '@/modules/views/dashboard'
import viewConfess from '@/modules/views/confess'
import sendMessage from '@/modules/messages/send'

const router = Router({ base: '/' })

router.post('/api/register-user', registerUser)
router.post('/api/send-message', sendMessage)

router.get('/', viewHome)
router.get('/dash', viewDashboard)

router.get('/@:url', viewConfess)

const handler = router.handle

export { handler }
