# Architecture Overview

## Layers

1. Input Surface
   - Single text field
   - No guidance
   - No examples

2. Field Filter
   - Removes forbidden constructs
   - Enforces neutral syntax
   - Strips pronouns and intent markers

3. Witness Engine
   - Stateless transformation
   - No conversation memory
   - No optimization loop

4. Output Surface
   - One response
   - Non-interactive
   - Non-persistent
