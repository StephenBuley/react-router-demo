import { getContact } from '../../contacts'
import { Params } from 'react-router-dom'

export async function loader({ params }: { params: Params<string> }) {
  const contact = await getContact(params.contactId!)
  return { contact }
}
