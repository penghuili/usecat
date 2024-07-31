# usecat

The simplest react state management library.

All of the popular react state management libs are too complex for me, I only need these:

1. Create a state for something;
2. Get the value of the state out of react component;
3. Set the value of the state out of react component;
4. A hook to read the value within react component;

Try **usecat** if you are like me.

## Installation

```
npm install usecat
```

## Usage

### Create some cats:

```
import { createCat } from 'usecat';

const isLoadingTodosCat = createCat(false);
const todosCat = createCat([]);
```

### Get and set cats' value outside of react component:

```
import { isLoadingTodosCat, todosCat } from './cats';

async function fetchTodos() {
  const currentTodos = todosCat.get();
  if (currentTodos?.length) {
    return;
  }

  isLoadingTodosCat.set(true);

  try {
    const response = await fetch('your-fancy-api');
    const todos = await response.json();
    todosCat.set(todos);
  } catch (e) {
    // handle error ;)
  }

  isLoadingTodosCat.set(false);
}
```

### Use hook within react component:

```
import { useCat } from 'usecat';
import { isLoadingTodosCat, todosCat } from './cats'
import { fetchTodos } from './network';

function MyComponent() {
  const isLoading = useCat(isLoadingTodosCat);
  const todos = useCat(todosCat);

  useEffect(() => {
    fetchTodos();
  }, [])

  return (
     <>
        {isLoading && <div>loading ...</div>}
        {todos.map(todo => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </>
  )
}
```

### Bonus API to reset all your cats:

```
import { resetAllCats } from 'usecat';


function handleLogout() {
  resetAllCats();
}
```

That's everything.
