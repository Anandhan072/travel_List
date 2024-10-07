import { useState } from "react";

function App() {
  const [item, setItems] = useState([]);

  function handleItems(item) {
    setItems((items) => [...items, item]);
  }

  function remoteId(id) {
    setItems((item) =>
      item.filter((acc) => {
        return acc.id !== id;
      })
    );
    console.log(item);
  }

  function handleToggelItem(id) {
    console.log("hi");
    setItems((items) =>
      items.map((item) => {
        console.log(item.id);
        return item.id === id ? { ...item, packed: !item.packed } : item;
      })
    );
  }

  function handleClearList() {
    if (item.length > 0) {
      const confirm = window.confirm("Are you what to delete all trip pack check list");
      if (confirm) setItems([]);
    }
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        items={item}
        onDelete={remoteId}
        toggleValue={handleToggelItem}
        clearItem={handleClearList}
      />
      <Stats items={item} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳 </h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { id: Date.now(), description, quantity, packed: false };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => (
          <option value={i + 1} key={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDelete, toggleValue, clearItem }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} key={item.id} onDelete={onDelete} toggleValue={toggleValue} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button
          onClick={() => {
            clearItem();
            setSortBy((s) => (s = "input"));
          }}
        >
          Clear list
        </button>
      </div>
    </div>
  );
}

function Item({ item, onDelete, toggleValue }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          toggleValue(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button data-id={item.id} onClick={() => onDelete(item.id)}>
        ❌
      </button>
    </li>
  );
}
function Stats({ items }) {
  const numItems = items.length;
  let packed = items.filter((item) => item.packed).length;
  const percentage = Math.floor((packed / numItems) * 100);

  console.log(`packed:`, packed);

  return (
    <footer className="stats">
      {/* <em>Start adding some items to your packing list 🚀</em> */}

      <em>
        {!percentage && !numItems
          ? "Start adding some items to your packing list 🚀"
          : percentage === 100
          ? "You got everything! Ready to go ✈️"
          : ` 💼 You have ${numItems} items on your list, and you already packed ${packed} (${percentage}% )`}
      </em>
    </footer>
  );
}

export default App;
