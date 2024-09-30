## Async Review

In the given directory, we have a simple content management system where content is split-up into multiple topics. Each topic has a separate directory associated with it.

In the root directory, there's a file called `index.json` which contains paths to different topics. Each topic also has a `index.json` which contains paths to the content files.

### Exercise

1. Fetch content from all the parts of topic 1 in parallel
2. Wait for 1 second
3. Fetch content from all the parts of topic 2 in parallel
4. Store all the fetched content in a file called `output.json` whose format looks like `output_format.json`
