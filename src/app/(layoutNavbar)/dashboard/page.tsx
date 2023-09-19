import Card from "@/components/Card";


export default async function Dashboard(): Promise<React.ReactElement> {
  const styles = {
    marginTop: '0px',
    marginBottom: '20px',
    //lineHeight: 4,
  };

  const styles_nextcours = {
    marginLeft: '20px',

  };

  return (<div >
    <div class="grid gap-4 grid-flow-col grid-rows-3">
    
    <Card><p style={styles}>
      Actualité du moment :<br />
    </p>
    <p style={styles}>
      Afterwork<br />
      trop bien sous titre<br />
      </p>
      <p style={styles}>
      Afterwork<br />
      trop bien sous titre<br />
      </p>
      <p style={styles}>
      Afterwork<br />
      trop bien sous titre<br />
      </p>

    </Card>
    
  <Card>Dernières ressources uploadées :<br/>
    voilà</Card>

    <div class = "row-span-3 ">
   <Card>Prochain cours :<br/>
   test</Card>
   </div>
    </div>
  </div>
  );
}
