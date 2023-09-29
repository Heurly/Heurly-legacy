import Actu from "@/components/Actu";
import Card from "@/components/Card";


export default async function Dashboard(): Promise<React.ReactElement> {
  const styles = {
    marginTop: '0px',
    //marginBottom: '20px',
    //lineHeight: 4,
  };

    const styles_font= {
    color: 'rgb(75 85 99)',
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
    <Actu><div class="flex justify-between">
      <p style={styles}>
      Afterwork </p> 
      <p style={styles_font}>date</p></div>
      trop bien sous titre<br />
      </Actu>
      <Actu><div class="flex justify-between">
      <p style={styles}>
      Afterwork </p> 
      <p style={styles_font}>date</p></div>
      trop bien sous titre<br />
      </Actu>
      <Actu><div class="flex justify-between">
      <p style={styles}>
      Afterwork </p> 
      <p style={styles_font}>date</p></div>
      trop bien sous titre<br />
      </Actu>

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
