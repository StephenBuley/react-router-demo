import { getContact, updateContact } from '../../contacts'
import { Params } from 'react-router-dom'

export async function loader({ params }: { params: Params<string> }) {
  const contact = await getContact(params.contactId!)
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Contact Not Found',
    })
  }
  return { contact }
}

export async function action({
  request,
  params,
}: {
  request: Request
  params: Params<string>
}) {
  const formData = await request.formData()
  for (const [name, value] of formData.entries()) {
    console.log(name, value)
  }
  return updateContact(params.contactId!, {
    favorite: formData.get('favorite') === 'true',
  })
}
