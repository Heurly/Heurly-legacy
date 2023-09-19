import Card from "@/components/Card";


export default async function Dashboard(): Promise<React.ReactElement> {

  return (<div>
    <Card>Actualité du moment :</Card>

    
    <Card>Dernière ressources uploadé :</Card>


    <Card>Prochain cours :</Card>
  </div>

  );
}
