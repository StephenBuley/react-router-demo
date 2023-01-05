import {
  Outlet,
  redirect,
  useLoaderData,
  Form,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom"
import { createContact, getContacts } from "../contacts"
import { useEffect } from "react"

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

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const contacts: IContact[] = await getContacts(q)
  return { contacts, q }
}

export default function Root() {
  const { contacts, q } = useLoaderData() as {
    contacts: IContact[]
    q: string | null
  }
  const navigation = useNavigation()
  const submit = useSubmit()

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q")

  useEffect(() => {
    const query = document.getElementById("q") as HTMLInputElement
    if (query !== null) {
      query.value = q || ""
    }
  }, [q])

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form role="search" id="search-form">
            <input
              type="search"
              aria-label="search-contacts"
              id="q"
              className={searching ? "loading" : ""}
              placeholder="search"
              name="q"
              defaultValue={q ? q : ""}
              onChange={(e) => {
                const isFirstSearch = q == null
                submit(e.currentTarget.form, {
                  replace: !isFirstSearch
                })
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching}></div>
            <div className="sr-only" aria-live="polite"></div>
          </Form>
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
