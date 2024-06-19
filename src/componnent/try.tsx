import { useEffect, useState } from "react";
import CircularIndeterminate from "../functions/progres";
import StickyHeadTable from "./commponentGetAllItems";

export default function DataFetchingComponent() {
    const [loading, setLoading] = useState(true); // משתנה לציון האם הנתונים עדיין לא חזרו מהשרת
    const [data, setData] = useState([]); // משתנה לאחסון הנתונים
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('API_ENDPOINT');
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); // מסיים את הטעינה
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        {loading ? ( // אם הטעינה עדיין מתבצעת, תציג את הפרוגרס
          <CircularIndeterminate />
        ) : ( // אם הטעינה הסתיימה, תציג את הטבלה עם הנתונים
          <StickyHeadTable/>
        )}
      </div>
    );
  }