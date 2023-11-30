import { updateContact } from '../../contacts'
import { Params, redirect } from 'react-router-dom'

export async function action({
  request,
  params,
}: {
  request: Request
  params: Params<string>
}) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData) as Record<string, string>
  await updateContact(params.contactId!, updates)
  return redirect(`/contacts/${params.contactId}`)
}
