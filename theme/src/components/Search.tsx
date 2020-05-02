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
import { Index } from 'elasticlunr'
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { DocsContext } from './Layout'

interface SearchProps {
  index: any
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

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])

  const index = useMemo(() => {
    return Index.load(props.index)
  }, props.index)

  const search = useCallback(() => {
    // Consider: Should we stop if query.length < 3?

    const r = index
      // Expand allows for partial matches (mer matches mermaid)
      .search(query, { expand: true })
      // Map over each ID and return the full document
      .map(({ ref }) => index.documentStore.getDoc(ref))

    //  Consider: Should be limit number of results?
    setResults(r)
  }, [index, query, setResults])

  // Consider: Search as you type - possible not a good idea for larger sites?
  useEffect(() => search(), [query, search])

  return (
    <>
      <Card>
        <CardContent>
          <Form display="flex" width={1} onSubmit={search}>
            <TextField
              flexGrow={1}
              id="query-input"
              label="Query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button color="primary">Search</Button>
          </Form>
        </CardContent>
      </Card>
      {results.length === 0 && query !== '' && (
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
              {results.map((r) => (
                <ListItem
                  key={r.id}
                  button
                  onClick={() => {
                    navigate(r.slug)
                  }}
                >
                  {r.title}
                  {r.description && <small>: {r.description}</small>}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </>
  )
}
