import { Table, TableHead, TableBody, TableRow, TableCell, Link, Paper, TableContainer } from "@mui/material";

interface NewsTableProps {
  news: any[];
}

const NewsTable = ({ newsItems }: { newsItems: any }) => {
  return (
    <TableContainer component={Paper} sx={{ margin: "auto", width: "100%", mt: 4, boxShadow: 3 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell><b>Title</b></TableCell>
            <TableCell><b>Description</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Link</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newsItems.length > 0 ? newsItems.map((news: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{news.title}</TableCell>
              <TableCell>{news.description}</TableCell>
              <TableCell>{news.pubDate}</TableCell>
              <TableCell>
                <Link href={news.link} target="_blank" rel="noopener noreferrer" color="primary">
                  Read More
                </Link>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Example Usage
const News = ({ news }: NewsTableProps) => {
  return <NewsTable newsItems={news} />;
};

export default News;
