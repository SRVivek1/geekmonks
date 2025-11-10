
# Explain ccontent filtering

# discuss scope, purpose, use case, benefits, drawbacks and best practices.
*   - Content filtering refers to removing the properties from Response bean when sending back to requestor.
*  - This feature is available in `jackson-annotations-x.x.jar`, which is added as part of `spring-boot-starter-web` dependency.

* write the complete artifact id for this - jackson-annotations-x.x.jar

# Project POC
* Check this app for reference - [Spring Boot poc app](https://github.com/SRVivek1/springboot-microservices-2024/tree/main/a9-sboot-ms-static-filtering)


# maven depndecies
- **<ins>Maven / External dependency</ins>**
  - Add spring validation dependency.
 	```xml
    	<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
	```
# Code changes 
- **<ins>Code changes</ins>**
  - We only need to update the Java Bean properties. No change required in controller.
  - imports
    - `import com.fasterxml.jackson.annotation.JsonIgnore;`
    - `import com.fasterxml.jackson.annotation.JsonIgnoreProperties;`
  - Annotate java properties to ignore while building the response.
	```java
		/** Ignore all specified properties from the class.  */
		@JsonIgnoreProperties(value = {"property4", "property6"})
		public class SomeBean {

			private String property1;
			
			// Ignore this property
			@JsonIgnore
			private String property2;
			private String property3;
			
			// @JsonIgnoreProperties - Ignore this
			private String property4;
			private String property5;
			
			// @JsonIgnoreProperties - Ignore this
			private String property6;

			// constructors, setter-getters and utility methods
		}
	```

# Observations notes
- **<ins>Notes:</ins>**
  - In this approach we're hardcoding that which properties should not be returned in response when the given bean is returned in response, irrespective of which API is using this.
  - Hence, this is called `Static Filtering`.
  - `@JsonIgnore` annotation:
    - Marks the property, to be removed when building response from this bean.
  - `@JsonIgnoreProperties` annotation
    - Marks a list of properties inside this class, to be removed when building response from this bean.

# add more details with your eexperince which an engineer should be aware of

# add points / sections if missed in above given points
