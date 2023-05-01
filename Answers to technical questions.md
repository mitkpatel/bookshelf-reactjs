# Interview Questions

1.  How long did you spend on the coding assignment?

    > I spent around 4-5 hours on the coding assignment."

    - a. What would you add to your solution if you had more time?
      > If I had more time, I would add more features and functionalities to make the application more robust and user-friendly. For example, I could add book into favourite feature where user can add the book into list of favourite and later on we can check it.
    - b. If you didn't spend much time on the coding test, then use this as an opportunity to explain what you would add.
      > If I did not spend much time on the coding test, I would have focused on completing the core functionalities of the application first, such as I would have added error handling and data validation to ensure the application's reliability and security. Additionally, I would have written unit tests to test the functionality of the application and avoid any unexpected bugs or issues.

2.  What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

        > In this project, I used the optional chaining operator (?.). It allows me to access nested properties or methods of an object without having to worry about whether intermediate values are null or undefined. Here's an example from my project:

    ```javascript
    const toggleOrder = (column) => {
      if (sorting?.column === column) {
        setSorting({
          column,
          order: sorting.order === "asc" ? "desc" : "asc",
        });
      } else {
        setSorting({ column, order: "asc" });
      }
    };
    ```

3.  How would you track down a performance issue in production? Have you ever had to do this?

    > To track down a performance issue in production, I would follow the following steps:

         1. Identify the problem: I would use monitoring tools to identify the specific performance issue, such as memory usage, slow response time form server, or errors.

         2. Analyze the problem: Once the problem is identified, I would analyze the logs and metrics to determine the root cause of the performance issue. This could involve examining database queries, server configurations, network traffic, or code optimizations.

         3. Optimize the code: Once the root cause is identified, I would work on optimizing the code to improve performance. This could involve refactoring code, caching data, or reducing database queries.

         4. Test the optimization: After optimizing the code, I would test the application to ensure that the performance issue has been resolved and there are no unexpected side effects.

    > Yes, I have had to track down performance issues in production before. In my previous roles I have to dealt with this kind of thing in each project, and I followed a systematic approach and patience to resolve.

4.  How would you improve the API that you just used?

    > The Open Library API could be improved by focusing on better documentation, error handling, data coverage, format support, authentication, and search functionality. Improving documentation would make it easier for developers to use the API, while better error handling would help them identify and fix issues more quickly. Increasing data coverage and format support would make the API more flexible and useful for a wider range of applications. Simplifying authentication would make the API easier to use and reduce potential errors or security vulnerabilities. Finally, improving search functionality would make it easier for users to find relevant information in the API.

5.  Please describe yourself using correctly formatted JSON.

    > Here is example from retrieving information about a book using the Open Library API

    ```javascript
    {
        "url": "https://openlibrary.org/books/OL306622M/The_Alchemist",
        "title": "The Alchemist",
        "authors": [
            {
            "name": "Paulo Coelho"
            }
        ],
        "publishers": [
            {
            "name": "HarperCollins Publishers"
            }
        ],
        "publish_date": "1988",
        "number_of_pages": 208,
        "cover": {
            "small": "https://covers.openlibrary.org/b/id/1113944-S.jpg",
            "medium": "https://covers.openlibrary.org/b/id/1113944-M.jpg",
            "large": "https://covers.openlibrary.org/b/id/1113944-L.jpg"
        },
        "subjects": [
            "Fiction"
        ]
    }
    ```
