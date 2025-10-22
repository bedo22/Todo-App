export default function Footer({todos}){
    console.log("Footer Rendered");
    return(
        <div className="mt-4 text-md text-center">
          Total Tasks: {todos.length}
        </div>
    )
}