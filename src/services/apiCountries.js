export async function getCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2");
  if (!res.ok) throw new Error("Failed to fetch country data: " + res);
  const data = await res.json();
  const countries = data
    .map((item) => {
      return {
        name: item.name.common,
        isoCode: item.cca2,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  return countries;
}
