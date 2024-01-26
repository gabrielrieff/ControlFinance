export function convertedDates(year: string, month: string){

    const yearConverted = parseInt(year as string, 10);
    const monthConverted = parseInt(month as string, 10);

    const monthZeroBased = monthConverted - 1;
    
    const startDate = new Date(yearConverted, monthZeroBased, 1);
    const endDate = new Date(yearConverted, monthZeroBased + 1, 1);

    return {startDate, endDate}
}