import {
  Button,
  Card,
  CardContent,
  Form,
  List,
  ListItem,
  TextField,
  Typography,
} from '@committed/components'
import { useFlexSearch } from 'react-use-flexsearch'
import React, { FC, useContext, useState } from 'react'
import { DocsContext } from './Layout'
import { withPrefix } from 'gatsby'

interface SearchProps {
  index: any
  store: any
}

// These are defined through gatsby-node.js in the elasticlunr config
interface Result {
  id: string
  title: string
  description?: string
  body: string
  slug: string
}

export const Search: FC<SearchProps> = (props: SearchProps) => {
  const { navigate } = useContext(DocsContext)

  const [query, setQuery] = useState(null)
  const results = useFlexSearch(query, props.index, props.store)

  console.log(results)

  return (
    <>
      <Card>
        <CardContent>
          <Form display="flex" width={1} onSubmit={(e) => e.preventDefault()}>
            <TextField
              flexGrow={1}
              id="query-input"
              label="Query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <Button color="primary">Search</Button>
          </Form>
        </CardContent>
      </Card>
      {results.length === 0 && query !== null && query !== '' && (
        <Typography variant="body1" gutterBottom>
          Sorry, no results found for "<i>{query}</i>"
        </Typography>
      )}
      {results.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="body1" gutterBottom>
              Found {results.length} results for "<i>{query}</i>".
            </Typography>
            <List>
              {results.map((r) => {
                return (
                  <ListItem
                    key={r.id}
                    button
                    onClick={() => {
                      // TODO: slug = test/mdTest is wrong, so we lowerc ase.
                      // I don't know if there's a bug somewhere else (or ig we are wrong to have an upper case in our filename)
                      navigate(withPrefix(r.slug.toLowerCase()))
                    }}
                  >
                    <div>
                      <b>
                        {r.title || 'Untitled'}
                        {r.description ? ': ' : ''}
                      </b>
                      <small>{r.description}</small>
                    </div>
                  </ListItem>
                )
              })}
            </List>
          </CardContent>
        </Card>
      )}
    </>
  )
}
