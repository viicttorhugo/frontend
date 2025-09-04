import { auth } from "../firebase";

export default function Dashboard() {
  const user = auth.currentUser;

  return (
    <div style={{minHeight: "100vh", padding: 32, fontFamily: "Inter, system-ui, sans-serif"}}>
      <header style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h1 style={{margin:0}}>FacilitaMed — Dashboard</h1>
        <button
          onClick={() => auth.signOut()}
          style={{padding: "10px 16px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer"}}
        >
          Sair
        </button>
      </header>

      <section style={{marginTop: 24}}>
        <div
          style={{
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 8px 30px rgba(0,0,0,.05)",
            maxWidth: 720
          }}
        >
          <h3 style={{marginTop:0}}>Seja bem-vindo(a){user?.displayName ? `, ${user.displayName}` : ""}!</h3>
          <p style={{opacity:.8}}>
            Esta é uma página de placeholder para confirmar o roteamento protegido.
            A partir daqui vamos plugar os módulos do FacilitaMed (pacientes, exames, documentos e billing).
          </p>
        </div>
      </section>
    </div>
  );
}
