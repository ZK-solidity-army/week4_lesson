import {useEffect, useState} from "react";
import {backend_base_uri} from "~~/components/api/utils/variables";



export function TokenAddressFromApi() {
    const [data, setData] = useState<{ result: string }>();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${backend_base_uri}/contract-address`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading token address from API...</p>;
    if (!data) return <p>No token address information</p>;

    return (
        <div>
            <p>Token address from API: {data.result}</p>
        </div>
    );
}