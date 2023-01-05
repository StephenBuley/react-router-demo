import {
  Outlet,
  redirect,
  useLoaderData,
  Form,
  NavLink,
  useNavigation,
} from "react-router-dom"
import { createContact, getContacts } from "../contacts"

export interface IContact {
  id: string
  first: string
  last: string
  avatar: string
  twitter: string
  notes: string
  favorite: boolean
}

export async function action() {
  const contact = await createContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export async function loader() {
  const contacts: IContact[] = await getContacts()
  return { contacts }
}

export default function Root() {
  const { contacts } = useLoaderData() as { contacts: IContact[] }
  const navigation = useNavigation()
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form role="search" id="search-form">
            <input
              type="search"
              aria-label="search-contacts"
              id="q"
              placeholder="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true}></div>
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  )
}
