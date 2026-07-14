# WORKFLOW

For this assignment, I built the same settings form twice to compare the difference between a vague AI prompt and a detailed AI prompt.

In Round 1, I used a simple prompt asking the AI to create a settings form with validation. The AI generated a working implementation, but it did not explain its approach in detail. I had to spend more time reviewing the code, understanding the changes, and checking whether important requirements such as validation and edge cases were handled correctly. The implementation worked, but it required more manual review.

In Round 2, I used a detailed prompt that instructed the AI to first explore the project, create a plan, explain which files would be modified, implement the feature, review its own work, write tests where appropriate, and verify the solution before finishing. This resulted in a more organized workflow and higher-quality output.

Comparing both implementations, the second approach produced cleaner code, better validation, improved accessibility, and stronger handling of edge cases. It also included tests that verified the validation logic. Running the tests confirmed that all tests passed successfully, giving greater confidence in the implementation.

One AI mistake I noticed during the process was that the first implementation did not fully consider testing and some edge cases. These issues were addressed in the second implementation after providing clearer instructions.

This exercise showed that writing a detailed prompt with planning, constraints, verification, and testing leads to better results and reduces the amount of manual review needed. I learned that directing AI effectively is an important skill and that verification is essential before accepting AI-generated code.